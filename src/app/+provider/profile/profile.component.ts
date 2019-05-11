import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { AuthService } from '../../services/auth.service';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../entities/provider';
import { FormErrorStateMatcher } from '../../entities/errors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public provider: Provider = new Provider();
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public state = 'show';
  public errorStateManager = new FormErrorStateMatcher();

  public formControls = {
    emailFormControl: undefined,
    nameFormControl: undefined,
    descriptionFormControl: undefined,
    phoneFormControl: undefined,
    addressFormControl: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private providerService: ProviderService) { }

  public async ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser.id) {
      this.provider = await this.providerService.getProviderById(currentUser.id);
    }
    this.galleryOptions = [
      { image: false, height: '450px', width: '100%', thumbnailsPercent: 30 },
      { breakpoint: 768, image: false, height: '200px', width: '100%', thumbnailsPercent: 30 }
    ];
    if (this.provider.images) {
      this.galleryImages = this.provider.images.map((i) => {
        return {
          small: i,
          medium: i,
          big: i
        };
      });
    }
  }

  public switchState(state: string) {
    if (state === 'edit') {
      this.formControls.emailFormControl = new FormControl(this.provider.email, [
        Validators.required,
        Validators.email,
      ]);
      this.formControls.nameFormControl = new FormControl(this.provider.name || '',
        [Validators.required]);
      this.formControls.phoneFormControl = new FormControl(this.provider.phone || '',
        [Validators.required]);
      this.formControls.addressFormControl = new FormControl(this.provider.address || '',
        [Validators.required]);
      this.formControls.descriptionFormControl = new FormControl(this.provider.description || '');
    }
    this.state = state;
  }

  public async updateProvider() {
    const editingProvider = {...this.provider};
    editingProvider.address = this.formControls.addressFormControl.value;
    editingProvider.name = this.formControls.nameFormControl.value;
    editingProvider.phone = this.formControls.phoneFormControl.value;
    editingProvider.description = this.formControls.descriptionFormControl.value;
    editingProvider.email = this.formControls.emailFormControl.value;
    this.state = 'loading';
    try {
      this.provider = await this.providerService.saveProvider(this.provider.id, editingProvider);
      this.state = 'show';
    } catch (e) {
      this.state = 'edit';
      console.error(e);
    }
  }

  // ----- private functions ------
}
