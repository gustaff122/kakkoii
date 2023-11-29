import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'kk-modal',
  standalone: true,
  imports: [ CommonModule, NgIconComponent ],
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() public label: string = '';

  constructor(
    private readonly dialogRef: DialogRef,
  ) {
  }

  public close(): void {
    this.dialogRef.close();
  }
}
