import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { STATUS } from '@prisma/client';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  constructor(
    private prismaService: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.initializeOverdueJobs();
  }

  private async initializeOverdueJobs() {
    const activeLoans = await this.prismaService.borrowing.findMany({
      where: {
        status: STATUS.BORROWED,
      },
    });

    for (const loan of activeLoans) {
      this.scheduleOverdueCheck(loan.id, loan.due_date);
    }
  }

  async scheduleOverdueCheck(borrowId: string, dueDate: Date) {
    const jobName = `overdue_${borrowId}`;

    try {
      this.schedulerRegistry.deleteCronJob(jobName);
    } catch (error) {}

    const cronDate = new Date(dueDate);
    const job = new CronJob(cronDate, async () => {
      const loan = await this.prismaService.borrowing.findFirst({
        where: {
          id: borrowId,
          status: STATUS.BORROWED,
        },
      });

      if (loan) {
        await this.prismaService.borrowing.update({
          where: {
            id: borrowId,
          },
          data: {
            status: STATUS.OVERDUE,
          },
        });

        console.log(`Loan ${borrowId} marked as OVERDUE`);
      }

      this.schedulerRegistry.deleteCronJob(jobName);
    });

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
  }
}
