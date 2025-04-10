import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Booking, User]),
    JwtModule,
    UsersModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
