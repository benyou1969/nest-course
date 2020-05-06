import { Module, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { AuthModule } from "src/auth/auth.module";

@UseGuards(AuthGuard)
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
