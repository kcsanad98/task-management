import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { typeormConfig } from './config/typeorm.config'

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(typeormConfig)
    ]
})
export class AppModule {}
