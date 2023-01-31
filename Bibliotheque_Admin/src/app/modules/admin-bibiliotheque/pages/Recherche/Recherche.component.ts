import { Router } from '@angular/router';
import { Ouvrage } from './../../models/ouvrage';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/general/model/user';
import { AccountService } from 'src/app/modules/general/services/account.service';
import { Theme } from '../../models/theme';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-Recherche',
  templateUrl: './Recherche.component.html',
  styleUrls: ['./Recherche.component.scss']
})
export class RechercheComponent implements OnInit {

 //pagination
 page: any;
 pageSize: any;
 count: number = 0;
 tableSize: number = 20;
 tableSizes: any = [3, 6, 9, 12];


 user: User | null = null;
 theme: Theme[]=[];
 colone: any=[];
 catalogues: Ouvrage[]=[];
 constructor(
   private toastr: ToastrService,
   private account: AccountService,
   private catlogueService: CatalogueService,
  private route: Router
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
 recherche(){
  this.page=1;
  this.catlogueService.recherche('K','DOC_SOUS_TITRE','cvhb').subscribe((res: any)=>{
    this.catalogues=res.contenu;
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
