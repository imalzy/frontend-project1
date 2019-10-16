import { PengeluarankasModule } from './pengeluarankas.module';

describe('PengeluarankasModule', () => {
  let pengeluarankasModule: PengeluarankasModule;

  beforeEach(() => {
    pengeluarankasModule = new PengeluarankasModule();
  });

  it('should create an instance', () => {
    expect(pengeluarankasModule).toBeTruthy();
  });
});
