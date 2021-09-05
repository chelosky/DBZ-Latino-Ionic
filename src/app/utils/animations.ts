import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';
  
export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

  
export const fadeIn = trigger('fadeIn', [      
    transition('void => *', [
      style({opacity: 0}),
      animate(500, style({opacity: 1}))
    ]),
    transition('* => void', [
      animate(500, style({opacity: 0}))
    ])
]);

export const fastFadeIn = trigger('fastFadeIn', [      
  transition('void => *', [
    style({opacity: 0}),
    animate(250, style({opacity: 1}))
  ]),
  transition('* => void', [
    animate(250, style({opacity: 0}))
  ])
]);

export const indicatorRotate = trigger('indicatorRotate', [
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  state('expanded', style({ transform: 'rotate(180deg)' })),
  transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
]);