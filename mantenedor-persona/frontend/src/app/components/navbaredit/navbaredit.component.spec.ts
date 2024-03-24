import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbareditComponent } from './navbaredit.component';

describe('NavbareditComponent', () => {
  let component: NavbareditComponent;
  let fixture: ComponentFixture<NavbareditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbareditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbareditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
