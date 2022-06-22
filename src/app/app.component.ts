import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalCrearComponent } from './modal-crear/modal-crear.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClientService } from 'src/services/client.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-angular';
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService, private client : ClientService) {}
  ngOnInit(): void {
    this.getAllClientes();
    // this.obtenerClientes();
  }

  openDialog() {
    this.dialog.open(ModalCrearComponent, {
      width: '500px'
    }).afterClosed().subscribe(val=>{
      if(val === 'save') {
        this.getAllClientes();
      }
    })
  }

  // obtenerClientes() {
  //   this.api.obtenerClientes()
  //   .subscribe({
  //     next: (res)=> {
  //       console.log(res);
  //     }
  //   })
  // }

  getAllClientes() {
    this.api.getClientes()
    .subscribe({
      next: (res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=> {
        alert("Error al intentar obtener el listado de clientes")
      }
    })
  }

  editarCliente(row:any) {
    this.dialog.open(ModalCrearComponent,{
      width: '500px',
      data: row
    }).afterClosed().subscribe(val=> {
      if(val === 'update') {
        this.getAllClientes();
      }
    })
  }

  eliminarCliente(id: number) {
    this.api.eliminarCliente(id)
    .subscribe({
      next : (res) => {
        alert("Cliente eliminado exitosamente")
        this.getAllClientes();
      },
      error : () => {
        alert("El cliente no se pude eliminar")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




//Correr el server
// json-server --watch db.json --no-cors
