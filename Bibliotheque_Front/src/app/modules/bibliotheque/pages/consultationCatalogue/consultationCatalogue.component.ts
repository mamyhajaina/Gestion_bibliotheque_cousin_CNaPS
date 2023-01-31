import { Catalogue } from './../../models/catalogue';
import { Theme } from './../../models/theme';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/general/model/user';
import { AccountService } from 'src/app/modules/general/services/account.service';
import { CatalogueService } from '../../services/catalogue.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-consultationCatalogue',
  templateUrl: './consultationCatalogue.component.html',
  styleUrls: ['./consultationCatalogue.component.scss']
})
export class ConsultationCatalogueComponent implements OnInit {

  //pagination
  page: any;
  pageSize: any;
  POSTS: any;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [3, 6, 9, 12];

  search: string = '';
  user: User | null = null;
  theme: Theme[]=[];
  colone: any=[];
  catalogues: Catalogue[]=[];
  cataloguesDetails: Catalogue=new Catalogue();
  cataloguesliste: Catalogue[]=[];
  loadingCatlogue: boolean=true;
  loadinshearch: boolean=false;

  catalogueDetails: Catalogue[]=[];
  nombreExemplaire: any;

  catalogueDispos: Catalogue[]=[];
  textDispo= '';
  texteDispovalue='';
  buttonDemande= '';
  constructor(
    private toastr: ToastrService,
    private account: AccountService,
    private catlogueService: CatalogueService,
    private spinner: NgxSpinnerService,
    private demandeService: DemandeService,
    ) { }

  ngOnInit(): void {
    this.account.user.subscribe((res) => {
      if (res != null) {
        this.user = res;

      } else if (res == null && this.account.getMatricule() != null) {
        this.getAgent();
      }
    });

    this.getAllCatalogue();
    this.getAllTheme();
    this.getAllColone();
    this.textDispo= 'text-warning';
    this.texteDispovalue='';
    this.buttonDemande='disabled';
  }
  
  async getDipos(){
    console.log(this.catalogueDetails,'details');
    this.catlogueService.findDispo(this.catalogueDetails).subscribe((res: any)=>{
      console.log(res,'Dispo');
      
    });
  }

  saveDemande(){
    const data={
      doc_cote: this.catalogueDispos[0].doc_cote,
      matricule: this.user?.matricule
    };
    console.log(data,' data save');
    
    this.demandeService.savedemande(data).subscribe((res: any)=>{
      console.log(res,'save demande');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    })
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
        this.catalogueDispos=res.contenu;
        if(res.flag==true){
          this.buttonDemande='';
          this.textDispo= 'text-success';
          this.texteDispovalue='DISPONIBLE TOU DE SUITE';
        }
        console.log(this.catalogueDispos,'this.catalogueDispos');
        
        if(res.flag==false){
          if(res.contenu==null){
            this.buttonDemande='disabled'
            this.textDispo= 'text-warning';
            this.texteDispovalue='NON Disponible';
          }
          else{
            this.buttonDemande='disabled'
            this.textDispo= 'text-warning';
            this.texteDispovalue='Disponible à partire de '+res.contenu;
          }
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

  searchCatlogue() {
    if(this.search && this.search.trim() != ''){
      this.cataloguesliste=this.catalogues.filter((item: Catalogue)=>{
        return (
                  (item?.doc_titre || '').toLowerCase().indexOf(this.search.toLowerCase()) >-1
                || (item?.doc_resume || '').toLowerCase().indexOf(this.search.toLowerCase()) >-1
                || (item.doc_lieu_edition || '').toLowerCase().indexOf(this.search.toLowerCase()) >-1
                || (item.doc_editeur || '').toLowerCase().indexOf(this.search.toLowerCase()) >-1
                || (item.doc_cote || '').toLowerCase().indexOf(this.search.toLowerCase()) >-1
                );
      });
    }
    if(this.search.trim() == '' || this.search.trim() == null){
      this.cataloguesliste=this.catalogues;
    }
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


  onTableDataChange(event: any) {
    this.page = event;
  }


  async getAllCatalogue(){
    this.spinner.show('recherche');
    this.catlogueService.findallCatalogue().subscribe((res: any)=>{
      this.catalogues=res.contenu;
      this.spinner.hide('recherche');
      this.searchCatlogue();
      console.log(res,'catlogue');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.spinner.hide('recherche');
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });

  }

  async getAllColone(){
    this.catlogueService.findallColone().subscribe((res: any)=>{
      this.colone=res.contenu;
      console.log(res,'Colone');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });

  }

  async getAllTheme(){
    this.catlogueService.findallTheme().subscribe((res: any)=>{
      this.theme=res.contenu;
      console.log(res,'theme');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });

  }
  getAgent(): void {
    let userInput: User = {
      matricule: this.account.getMatricule(),
    };
    this.account.getAgentActif(userInput).subscribe((res: any) => {
      this.user = res[0] as User;
      this.account.setUser(this.user);
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    });
  }

}
