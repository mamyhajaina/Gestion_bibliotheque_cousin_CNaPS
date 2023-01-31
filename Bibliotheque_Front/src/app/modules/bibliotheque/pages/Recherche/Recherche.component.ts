import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/general/model/user';
import { AccountService } from 'src/app/modules/general/services/account.service';
import { Catalogue } from '../../models/catalogue';
import { Theme } from '../../models/theme';
import { CatalogueService } from '../../services/catalogue.service';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-Recherche',
  templateUrl: './Recherche.component.html',
  styleUrls: ['./Recherche.component.scss']
})
export class RechercheComponent implements OnInit {

 //pagination
 page: any;
 pageSize: any;
 POSTS: any;
 count: number = 0;
 tableSize: number = 20;
 tableSizes: any = [3, 6, 9, 12];


 user: User | null = null;
 theme: Theme[]=[];
 colone: any=[];
 catalogues: Catalogue[]=[];
 ngModelTheme: string='';
 ngModelChamps: string='';
 ngModelChampsValue: string='';

 cataloguesDetails: Catalogue=new Catalogue();
  nombreExemplaire: any;
  catalogueDetails: Catalogue[]=[];
  catalogueDispos: Catalogue[]=[];

  textDispo= '';
  texteDispovalue='';
  buttonDemande= '';

  texteDispo: boolean=false;
 constructor(
   private toastr: ToastrService,
   private account: AccountService,
   private catlogueService: CatalogueService,
   private route: Router,
   private spinner: NgxSpinnerService,
   private demandeService: DemandeService,
   private modale: FormsModule
   ) { }

 ngOnInit(): void {
   this.account.user.subscribe((res) => {
     if (res != null) {
       this.user = res;

     } else if (res == null && this.account.getMatricule() != null) {
       this.getAgent();
     }
   });
   this.getAllTheme();
   this.getAllColone();
 }

 saveDemande(){
  this.buttonDemande='disabled';
  const data={
    doc_cote: this.cataloguesDetails.doc_cote,
    matricule: this.user?.matricule
  };
  console.log(data,' data save');
  
  this.demandeService.savedemande(data).subscribe((res: any)=>{
    this.toastr.success('Demande de ouvrage envoyer');
    console.log(res,'save demande');
  },(error: HttpErrorResponse) => {
    if (error.status != 401) {
      this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
    }
  })
}

 listeOuvrageDispo(){
  this.spinner.show('recherche');
  this.catlogueService.findAllDispo().subscribe((res: any)=>{
    this.catalogues=res.contenu;
    this.texteDispo=true;
    this.spinner.hide('recherche');
  },(error: HttpErrorResponse) => {
    if (error.status != 401) {
      this.spinner.hide('recherche');
      this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
    }});
 }

 async getCatlogueDetails(doc_cote: any){
  console.log(doc_cote,'doc cote');
  this.spinner.show('dispos');
  this.catlogueService.findallCatalogueDetails(doc_cote).subscribe((res: any)=>{
    this.catalogueDetails=res.contenu;
    
    console.log(this.catalogueDetails.length,' hajaina  taille');
    console.log(this.catalogueDetails,'this.catalogueDetails');
    
    this.catlogueService.findDispo(this.catalogueDetails).subscribe((res: any)=>{
      console.log(res,'Dispo');
      this.spinner.hide('dispos');
      this.catalogueDispos=res;
      if(res.flag==true){
        this.buttonDemande='';
        this.textDispo= 'text-success';
        this.texteDispovalue='DISPONIBLE TOU DE SUITE';
      }
      console.log(this.catalogueDispos,'this.catalogueDispos');
      
      if(res.flag==false){
        this.buttonDemande='disabled'
        this.textDispo= 'text-warning';
        this.texteDispovalue='NON DISPONIBLE';
      }
      console.log(this.textDispo,'textDispo');
      console.log(this.texteDispovalue,'disponiblite');
      
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('dispos');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
    // this.getDipos();
    this.nombreExemplaire=this.catalogueDetails.length;
  },(error: HttpErrorResponse) => {
    if (error.status != 401) {
      this.spinner.hide('recherche');
      this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
    }
  });
}

 setCatlogueDetails(catlodue: Catalogue){
  this.getCatlogueDetails(catlodue.doc_cote);
  this.cataloguesDetails=catlodue;
  console.log(this.cataloguesDetails,'cataloguesDetails');

}

 navigateAll(){
  this.route.navigate(['bibliotheque/catalogue']);
}

 recherche(){
  this.page=1;
  this.spinner.show('recherche');
  console.log(this.ngModelTheme,'ngModelTheme',this.ngModelChamps,'ngModelChamps',this.ngModelChampsValue,'ngModelChampsValue');
  
  this.catlogueService.recherche(this.ngModelTheme,this.ngModelChamps,this.ngModelChampsValue).subscribe((res: any)=>{
    this.catalogues=res.contenu;
    console.log(this.catalogues,'Ctalogue');
    this.spinner.hide('recherche');
  },(error: HttpErrorResponse) => {
    if (error.status != 401) {
      this.spinner.hide('recherche');
      this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
    }
  });
 }

 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
 }


 onTableDataChange(event: any) {
   this.page = event;
 }


 async getAllCatalogue(){
   this.catlogueService.findallCatalogue().subscribe((res: any)=>{
     this.catalogues=res.contenu;
     console.log(res,'catlogue');
   });

 }

 async getAllColone(){
   this.catlogueService.findallColone().subscribe((res: any)=>{
     this.colone=res.contenu;
     console.log(res,'Colone');
   });

 }

 async getAllTheme(){
   this.catlogueService.findallTheme().subscribe((res: any)=>{
     this.theme=res.contenu;
     console.log(res,'theme');
   });

 }
 getAgent(): void {
   let userInput: User = {
     matricule: this.account.getMatricule(),
   };
   this.account.getAgentActif(userInput).subscribe((res: any) => {
     this.user = res[0] as User;
     this.account.setUser(this.user);
   });
 }

}
