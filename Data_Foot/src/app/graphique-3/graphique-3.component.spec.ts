import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphique3Component } from './graphique-3.component';

describe('Graphique3Component', () => {
  let component: Graphique3Component;
  let fixture: ComponentFixture<Graphique3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphique3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Graphique3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
