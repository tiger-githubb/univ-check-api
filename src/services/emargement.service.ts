import { AppDataSource } from "../config/data-source";
import { CreateEmargementDto } from "../dto/emargement.dto";
import { ClassSession } from "../entity/ClassSession.entity";
import { Emargement, EmargementStatus } from "../entity/Emargement.entity";
import { RoleEnum, User } from "../entity/User.entity";
import socketGateway from "../../api/index";
import { In } from "typeorm";
import { EventEnum } from "../socket/socket.gateway";

export class EmargementService {
  private readonly emargementRepository =
    AppDataSource.getRepository(Emargement);
  private readonly userRepo = AppDataSource.getRepository(User);
  private readonly sessionRepository =
    AppDataSource.getRepository(ClassSession);

  async createEmargement(
    data: Partial<CreateEmargementDto>
  ): Promise<Emargement> {
    try {
      const professor = await this.userRepo.findOneByOrFail({
        id: data.professorId,
      });
      const classSession = await this.sessionRepository.findOne({
        relations: { course: true, classRepresentative: true },
        where: { id: data.classSessionId },
      });

      if (professor && classSession) {
        const { professorId, classSessionId, ...rest } = data;
        const emargement = this.emargementRepository.create({
          ...rest,
          professor,
          classSession,
        });
        if (emargement) {
          const users = await this.userRepo.find({
            where: { role: RoleEnum.SUPERVISOR },
          });
          if (classSession.classRepresentative) {
            users.push(classSession.classRepresentative);
          }
          return await this.emargementRepository.save(emargement).then((rep) => {
            if (users?.length > 0) {
              socketGateway.onEmargement(users, EventEnum.EMARGEMENT, {
                id: emargement.id,
                status: emargement.status,
                professor: professor.name,
                course: classSession.course.name,
                message: `Emargement de ${professor.name} pour le cours de ${classSession.course.name}`,
              });
            }
            return rep;
          });
        }
      }
      return null;
    } catch (error) {
      console.log("ERROR::createEmargement", error);
      throw error;
    }
  }

  async getEmargementById(id: string): Promise<Emargement | null> {
    return await this.emargementRepository.findOne({
      where: { id },
      relations: {
        classSession: { course: true, classRepresentative: true },
        professor: true,
      },
      select: {
        professor: {
          id: true,
          name: true,
          role: true,
          email: true,
          phone: true,
        },
      },
    });
  }

  async getAllEmargements(): Promise<Emargement[]> {
    return await this.emargementRepository.find({
      order: { updatedAt: "DESC" },
      relations: { classSession: true, professor: true },
      select: {
        professor: {
          id: true,
          name: true,
          role: true,
          email: true,
          phone: true,
        },
      },
    });
  }

  async updateEmargement(
    id: string,
    data: Partial<CreateEmargementDto>
  ): Promise<Emargement | null> {
    const emargement = await this.emargementRepository.findOneBy({ id });
    if (!emargement) return null;

    const { professorId, classSessionId, ...rest } = data;

    // Si un nouvel ID de professeur est fourni
    if (professorId) {
      emargement.professor = await this.userRepo.findOneByOrFail({
        id: professorId,
      });
    }

    // Si un nouvel ID de session de classe est fourni
    if (classSessionId) {
      emargement.classSession = await this.sessionRepository.findOneByOrFail({
        id: classSessionId,
      });
    }

    // Mise à jour des autres champs simples
    Object.assign(emargement, rest);

    return await this.emargementRepository.save(emargement);
  }

  async setStatus(id: string, status: EmargementStatus): Promise<boolean> {
    const emargement = await this.getEmargementById(id);
    if (emargement) {
      let users: User[] = [emargement.professor];

      if (
        (status === EmargementStatus.CLASS_HEADER_CONFIRMED &&
          emargement.status === EmargementStatus.SUPERVISOR_CONFIRMED) ||
        (status === EmargementStatus.SUPERVISOR_CONFIRMED &&
          emargement.status === EmargementStatus.CLASS_HEADER_CONFIRMED)
      ) {
        emargement.status = EmargementStatus.PRESENT;
      } else if (
        emargement.status === EmargementStatus.PENDING &&
        status !== EmargementStatus.PENDING
      ) {
        if (status !== EmargementStatus.CLASS_HEADER_CONFIRMED) {
          if (emargement.classSession?.classRepresentative) {
            users.push(emargement.classSession.classRepresentative);
          }
        } else {
          users.push(
            ...(await this.userRepo.find({
              where: { role: RoleEnum.SUPERVISOR },
            }))
          );
        }
        // oblige les deux validations
        emargement.status = status;
      } else {
        return false;
      }

      return await this.emargementRepository.save(emargement).then(() => {
        if (users?.length > 0) {
          let statusMessage = `Emargement de ${emargement.professor.name} pour le cours de ${emargement.classSession.course.name} `;
          if (emargement.status === EmargementStatus.PRESENT) {
            statusMessage += "est confirmé présent";
          } else if (
            emargement.status === EmargementStatus.CLASS_HEADER_CONFIRMED
          ) {
            statusMessage += `est confirmé par le délégué ${emargement.classSession?.classRepresentative?.name}.`;
          } else if (
            emargement.status === EmargementStatus.SUPERVISOR_CONFIRMED
          ) {
            statusMessage += `est confirmé par le superviseur.`;
          } else if (emargement.status === EmargementStatus.ABSENT) {
            statusMessage = `L'enseignant ${emargement.professor.name} est absent pour le cours de ${emargement.classSession.course.name}`;
          }
          socketGateway.onEmargement(
            users,
            EventEnum.EMARGEMENT_STATUS_CHANGE,
            {
              id: emargement.id,
              status: emargement.status,
              professor: emargement.professor.name,
              course: emargement.classSession.course.name,
              message: statusMessage,
            }
          );
        }
        return true;
      });
    }
  }

  async deleteEmargement(id: string): Promise<void> {
    await this.emargementRepository.delete(id);
  }

  async getEmargementsByTeacher(teacherId: string): Promise<Emargement[]> {
    return await this.emargementRepository.find({
      where: { professor: { id: teacherId } },
      order: { updatedAt: "DESC" },
      relations: { classSession: true, professor: true },
    });
  }
}
