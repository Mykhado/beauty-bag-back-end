import { Test, TestingModule } from '@nestjs/testing';
import { MailToController } from './mail-to.controller';
import { MailToService } from './mail-to.service';

describe('MailToController', () => {
  let controller: MailToController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailToController],
      providers: [MailToService],
    }).compile();

    controller = module.get<MailToController>(MailToController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
