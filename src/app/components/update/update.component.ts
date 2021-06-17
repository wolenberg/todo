import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  titulo = new FormControl('',[Validators.minLength(3)])
  dataFinalizar = new FormControl('',[Validators.required])

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date,
    finalizado: false

  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formataData();
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
    
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {

      this.todo = resposta;

    })
  }

  update() : void {
      this.service.update(this.todo).subscribe((resposta) => {

      this.service.message("To-do atualizado com sucesso !");
      this.router.navigate(['']);

    }, err => {

      this.service.message("Falha ao atualizar To-do !");
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
