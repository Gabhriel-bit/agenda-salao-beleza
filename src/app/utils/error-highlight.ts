import { Directive, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[appErrorHighlight]'
})
export class ErrorHighlight implements OnInit{

    @Input() condicional: Boolean;
    @Input() defaultColor: string;
    @Input() selectedColor: string;
    @HostBinding('style.backgroundColor') highlightBackground: string;
    
    ngOnInit(): void {
        this.defaultColor = this.defaultColor === '' ? 'transparent' : this.defaultColor;
        this.selectedColor = this.selectedColor === '' ? 'rgb(245, 204, 204)' : this.selectedColor;

        this.highlightBackground = this.condicional ? this.selectedColor : this.defaultColor;
    }


}    

/*usar assim
    <p appErrorHighlight [condicional]="true"     
                            [defaultColor]="'red'"   --Opcional
                            [selectedColor]="'blue'" --Opcional
                            >
        Um texto para teste
    </p>
*/