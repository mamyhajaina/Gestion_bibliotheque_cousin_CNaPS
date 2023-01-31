import { DemandeService } from './../../services/demande.service';
import { Catalogue } from './../../models/catalogue';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/modules/general/services/account.service';
import { User } from 'src/app/modules/general/model/user';

@Component({
  selector: 'calogueDetails-item',
  templateUrl: './calogueDetails-item.component.html',
  styleUrls: ['./calogueDetails-item.component.scss']
})
export class CalogueDetailsItemComponent implements OnInit {

  @Input() catalogue: Catalogue=new Catalogue();
  catalogueDetails: Catalogue[]=[];
  @Input() nombreExemplaire: any;
  user: User | null = null;
  textDispo= 'text-warning';

  constructor(
    private demandeService: DemandeService,
    private toastr: ToastrService,
    private account: AccountService,
  ){}

  ngOnInit() {
    this.account.user.subscribe((res) => {
      if (res != null) {
        this.user = res;

      } else if (res == null && this.account.getMatricule() != null) {
        this.getAgent();
      }
    });
    console.log(this.catalogue,'hajaina');
    
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

  saveDemande(){
    const data={
      doc_cote: this.catalogue.doc_cote,
      matricule: this.user?.matricule
    };
    this.demandeService.savedemande(data).subscribe((res: any)=>{
      console.log(res,'save demande');
    },(error: HttpErrorResponse) => {
      if (error.status != 401) {
        this.toastr.warning('Problème de connexion: Veuillez réessayer', '');
      }
    })
  }

}
