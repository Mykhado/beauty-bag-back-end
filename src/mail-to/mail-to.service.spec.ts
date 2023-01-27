import { Test, TestingModule } from '@nestjs/testing';
import { MailToService } from './mail-to.service';

describe('MailToService', () => {
  let service: MailToService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailToService],
    }).compile();

    service = module.get<MailToService>(MailToService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
