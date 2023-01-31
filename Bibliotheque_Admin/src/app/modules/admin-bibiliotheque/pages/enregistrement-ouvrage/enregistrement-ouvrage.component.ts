import { NgxSpinnerService } from 'ngx-spinner';
import { Auteur_and_Ouvarge } from './../../models/auteur_and_Ouvarge';
import { TypeService } from './../../services/type.service';
import { Type } from './../../models/type';
import { Theme } from './../../models/theme';
import { ThemeService } from './../../services/theme.service';
import { OuvrageService } from './../../services/Ouvrage.service';
import { Ouvrage } from './../../models/ouvrage';
import { Auteur } from './../../models/auteur';
import { AuteurService } from './../../services/auteur.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enregistrement-ouvrage',
  templateUrl: './enregistrement-ouvrage.component.html',
  styleUrls: ['./enregistrement-ouvrage.component.scss']
})
export class EnregistrementOuvrageComponent implements OnInit {

  ouvrage: Ouvrage= new Ouvrage();
  auteur: Auteur[]=[];
  auteurSave: Auteur=new Auteur();
  theme: Theme[]=[];
  type: Type[]=[];
  auteur_and_Ouvrage: Auteur_and_Ouvarge=new Auteur_and_Ouvarge();
  constructor(
    private toastr: ToastrService,
    private auteurServie: AuteurService,
    private ouvrageService: OuvrageService,
    private themeService: ThemeService,
    private typeService: TypeService,
    private spinner: NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.findAllAuteur();
    this.findAllTheme();
    this.findAllType();
  }

  enregistrement(){
    this.spinner.show('search');
    this.auteur_and_Ouvrage.auteur=this.auteurSave;
    this.auteur_and_Ouvrage.document=this.ouvrage;
    console.log(this.auteur_and_Ouvrage,'auteur et ouvrage');
    
    const data={
      auteur: this.ouvrage,
      document: this.auteurSave
    }
    console.log(data,'data');
    this.ouvrageService.saveOuvrage(this.auteur_and_Ouvrage).subscribe(( res: any)=>{
      console.log(res,'save');
      this.ouvrage=new Ouvrage();
      this.success();
      this.spinner.hide('search');
    },
    (error: HttpErrorResponse) => {
      if (error.status != 401) {
        console.log('error');
        this.error();
        this.spinner.hide('search');
      }
    });
  }

  findAllType(){
    this.spinner.show('type');
    this.typeService.findall().subscribe( (res: any)=>{
      this.type=res.contenu;
      console.log(this.theme,'theme');
      this.spinner.hide('type');
    },
    (error: HttpErrorResponse) => {
      if (error.status != 401) {
        console.log('error');
        this.toastr.error('Problème de connexionx, veuillez réessayer', '');
        this.spinner.hide('type');
      }
    });
  }

  findAllTheme(){
    this.spinner.show('theme');
    this.themeService.findallTheme().subscribe( (res: any)=>{
      this.theme=res.contenu;
      console.log(this.theme,'theme');
      this.spinner.hide('theme');
    },
    (error: HttpErrorResponse) => {
      if (error.status != 401) {
        console.log('error');
        this.toastr.error('Problème de connexionx, veuillez réessayer', '');
        this.spinner.hide('theme');
      }
    });
  }
  findAllAuteur(){
    this.spinner.show('auteurspinner');
    this.auteurServie.findalls().subscribe( (res: any)=>{
      this.auteur=res.contenu;
      console.log(this.auteur,'auteur');
      this.spinner.hide('auteurspinner');
    },
    (error: HttpErrorResponse) => {
      if (error.status != 401) {
        console.log('error');
        this.toastr.error('Problème de connexionx, veuillez réessayer', '');
        this.spinner.hide('auteurspinner');
      }
    });
  }

  info() {
    this.toastr.info('Message / notification INFO', '');
  }
  success() {
    this.toastr.success('Le document a été bien enregistre avec succès', '');
  }
  warning() {
    this.toastr.warning('Erreur champs manquants', '');
  }
  error() {
    this.toastr.error('Erreur champs manquants', '');
  }
}
