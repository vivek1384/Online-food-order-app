import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReveiwComponent } from './reveiw.component';

describe('ReveiwComponent', () => {
  let component: ReveiwComponent;
  let fixture: ComponentFixture<ReveiwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReveiwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReveiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
