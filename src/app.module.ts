import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { LoggerModule } from 'nestjs-pino'
import pretty from 'pino-pretty'
import { NotificationsModule } from 'src/notifications/notificatons.module'
import { SubsModule } from 'src/subs/subs.module'
import { TemplatesModule } from 'src/templates/templates.module'

@Module({
  imports: [
    SubsModule,
    TemplatesModule,
    NotificationsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          pinoHttp: {
            level: 'info',
            autoLogging: false,
            stream: pretty({
              colorize: true,
            }),
          },
        }
      },
    }),
  ],
})
export class AppModule {}
