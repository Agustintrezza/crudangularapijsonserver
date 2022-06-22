import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.scss']
})
export class ModalCrearComponent implements OnInit {

  clienteForm !: FormGroup;
  actionBtn : string = "Guardar"

  constructor(private formBuilder : FormBuilder,
              private api : ApiService, 
              private client : ClientService,
              @Inject (MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<ModalCrearComponent>) { }

  ngOnInit(): void {
    // this.obtener();
    this.clienteForm = this.formBuilder.group ({
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      email: ['', Validators.required]
    })
    if(this.editData) {
      this.actionBtn = "Actualizar"
      this.clienteForm.controls['nombre'].setValue(this.editData.nombre);
      this.clienteForm.controls['apellido'].setValue(this.editData.apellido);
      this.clienteForm.controls['email'].setValue(this.editData.email);
    }
  }

  crearCliente() {
    if(!this.editData) {
      if(this.clienteForm.valid) {
        this.api.postCliente(this.clienteForm.value)
        .subscribe({
          next: (res) => {
           alert("Cliente Agregado Exitosamente")
           this.clienteForm.reset();
           this.dialogRef.close('save');
          },
          error:()=> {
            alert("No se pudo agregar correctamente")
          }
        })
      }
    } else {
      this.actualizarCliente()
    }
  }

  actualizarCliente() {
    this.api.putCliente(this.clienteForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Cliente actualizado exitosamente")
        this.clienteForm.reset()
        this.dialogRef.close('update')
      },
      error: () => {
        alert("No se pudo actualizar correctamente")
      }
    })
  }

  obtener() {
    this.client.listAll(this.clienteForm.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

}
