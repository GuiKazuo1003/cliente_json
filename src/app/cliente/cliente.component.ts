import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { cliente } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clients: cliente[] = []
  formGroupClient : FormGroup;
  isEditing: boolean = false;

  constructor (private clienteService: ClientService, private formBuilder: FormBuilder){
    this.formGroupClient = formBuilder.group(
      {
        id : [''],
        name : [''],
        email : ['']
      }
    )
  }
  ngOnInit(): void {
    this.loadCliente();
  }

  loadCliente(){
    this.clienteService.getClients().subscribe(
      {
        next: data => this.clients = data,
        error: msg => console.log("Erro ao chamar o endpoint " + msg)
      }
    )
  }
  save(){
    if(this.isEditing){
      
      this.clienteService.uptade(this.formGroupClient.value).subscribe(
        {
          next : () => {
            this.loadCliente();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else
      this.clienteService.save(this.formGroupClient.value).subscribe(
        {
          next : data => {
            this.clients.push(data);
            this.formGroupClient.reset();
          }
        }
      )
    }
  
  
  edit(client: cliente): void {
      this.formGroupClient.setValue(client);
      this.isEditing = true;
  }
  remove(client: cliente): void{

    this.clienteService.remove(client).subscribe({
    
    next:() => this.loadCliente()
    
    });
    
    }

  
}
