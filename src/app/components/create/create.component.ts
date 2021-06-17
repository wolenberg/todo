import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  titulo = new FormControl('',[Validators.minLength(3)])

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date,
    finalizado: false

  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  create () : void {
    this.formataData();
    this.service.create(this.todo).subscribe((resposta) => {

      this.service.message("To-do Criado com sucesso !");
      this.router.navigate(['']);

    }, err => {

      this.service.message("Falha ao criar To-do !");
      this.router.navigate(['']);

    })
  }

  cancel() :void {
    this.router.navigate(['']);
  }

  formataData() :void {
   let data = new Date(this.todo.dataParaFinalizar);
   this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  getMessage() {
    if(this.titulo.invalid){
      return "O campo deve conter entre 3 e 100 caracteres";
    }


    return false;

  }

}
