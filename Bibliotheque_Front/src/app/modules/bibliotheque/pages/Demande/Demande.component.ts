import { RenouvellementService } from './../../services/renouvellement.service';
import { MouvementService } from './../../services/mouvement.service';
import { DemandeService } from './../../services/demande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/general/model/user';
import { AccountService } from 'src/app/modules/general/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-Demande',
  templateUrl: './Demande.component.html',
  styleUrls: ['./Demande.component.scss']
})
export class DemandeComponent implements OnInit {

  user: User | null = null;
  demande: any=[];
  demandeValide: any=[];
  demandeEncours: any=[];
  encour: any;
  details: any;
  dateNow =new Date('2023-02-14').toDateString();
  constructor(
    private account: AccountService,
    private toastr: ToastrService,
    private demandeservice: DemandeService,
    private mouvementService: MouvementService,
    private renouvellerService: RenouvellementService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    
    this.account.user.subscribe((res) => {
      if (res != null) {
        
        this.user = res;
        this.getDemandeValide();
      this.getDemandeEncoure();

      } else if (res == null && this.account.getMatricule() != null) {
        
        this.getAgent();
      }
    });
    
  }

  calculeData(id: any){
    console.log('tafitra');
    
    this.mouvementService.calculeDate(id).subscribe((res: any)=>{
      console.log(res,'calcule date');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

  renouvellercomp(data: any){
    console.log(data,"hjjkl");
    
    const body={
      mvt_id: data.id_MVT ,
      doc_cote: data.doc_COTE,
      matricule : this.user?.matricule
    }
    this.renouvellerService.renouveller(body).subscribe((res: any)=>{
      this.toastr.success('Votre renouvellement a été envoyer')
      console.log(res,'renouveller');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.error(`Un demandeur ne peut renouveller q'une seule fois `);
      }
    });
  }

  annuler(idmvt: any){
    const body={
      mvt_id: idmvt
    }
    this.mouvementService.delete(body).subscribe((res: any)=>{
      console.log(res,'Annuler');
      this.getDemandeEncoure();
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

  setdetails(details: any){
    console.log(details,'details id');
    this.spinner.show('details');
    this.demandeservice.finDetails(details.mvt_id).subscribe((res: any)=>{
      this.details=res.contenu;
      this.spinner.hide('details');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('details');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

  async getDemandeValide(){
    this.spinner.show('valide');
    this.demandeservice.findDemandeValide(this.user?.matricule).subscribe((res: any)=>{
      this.demandeValide=res.contenu;
      this.spinner.hide('valide');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('valide');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

  async getDemandeEncoure(){
    this.spinner.show('encourTraite');
    this.demandeservice.findDemandeEncoure(this.user?.matricule).subscribe((res: any)=>{
      this.demandeEncours=res.contenu;
      this.spinner.hide('encourTraite');
      console.log(this.demandeEncours.date_retour);
      
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('encourTraite');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

  async getHistoriqueDemande(){
    this.spinner.show('recherche');
    console.log(this.user?.matricule,'matricule');
    
    this.demandeservice.historiquedemande(this.user?.matricule).subscribe((res: any)=>{
      this.demande=res.contenu;
      console.log(res,'demande');
      this.spinner.hide('recherche');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('recherche');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    })
  }

  getAgent(): void {
    let userInput: User = {
      matricule: this.account.getMatricule(),
    };
    this.account.getAgentActif(userInput).subscribe((res: any) => {
      this.user = res[0] as User;
      this.account.setUser(this.user);
      this.getDemandeValide();
      this.getDemandeEncoure();
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }



}
