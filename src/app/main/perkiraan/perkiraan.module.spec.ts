import { PerkiraanModule } from './perkiraan.module';

describe('PerkiraanModule', () => {
  let perkiraanModule: PerkiraanModule;

  beforeEach(() => {
    perkiraanModule = new PerkiraanModule();
  });

  it('should create an instance', () => {
    expect(perkiraanModule).toBeTruthy();
  });
});
