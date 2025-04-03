import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthService } from './oauth.service';


@Controller('auth')
export class OAuthController {
  constructor(private readonly authService: OAuthService) {}

  @Get('google/sign')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any) {
    const userObj = req.user as any;
    if (!userObj || !userObj.profile) {
      throw new Error('Google profile is missing from callback');
    }

    const user = {
      userId: userObj.profile.id,
      email: userObj.profile.emails[0].value,
      name: userObj.profile.displayName,
      photo: userObj.profile.photos[0].value,
    };
    return await this.callbackSign(user);
  }

  @Post('callback/sign')
  async callbackSign(user: any) {
    return await this.authService.validateUser(user);
  }
}
