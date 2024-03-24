import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagreComponent } from './editagre.component';

describe('EditagreComponent', () => {
  let component: EditagreComponent;
  let fixture: ComponentFixture<EditagreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditagreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditagreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
