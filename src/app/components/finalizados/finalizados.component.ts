import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  closed = 0;

  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll():void {
    this.service.findAll().subscribe((resposta)=> {
      resposta.forEach(todo => {
        if (todo.finalizado) {
        this.listFinished.push(todo);
       } 
      }
      )
      
    })
  }

  cancelar(item: Todo) :void {
    item.finalizado = false;
    this.service.update(item).subscribe(() => {
      
        this.service.message("Task cancelada com sucesso !");
        this.list = this.list.filter(todo => todo.id !== item.id);
        this.closed++;
        this.voltar();
    })

  }

  voltar() :void {
    this.router.navigate([''])
  }
}
