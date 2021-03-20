import { Test, TestingModule } from '@nestjs/testing';
import { XssService } from './xss.service';

describe('XssService', () => {
  let service: XssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XssService],
    }).compile();

    service = module.get<XssService>(XssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
