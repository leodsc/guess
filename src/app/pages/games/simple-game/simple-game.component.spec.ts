import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGameComponent } from './simple-game.component';

describe('SimpleGameComponent', () => {
  let component: SimpleGameComponent;
  let fixture: ComponentFixture<SimpleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
