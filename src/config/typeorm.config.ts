import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: '',
  database: 'nestcourse',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
