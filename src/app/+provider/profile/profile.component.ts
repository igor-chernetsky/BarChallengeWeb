import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TranslateService } from '@ngx-translate/core';

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
  public errorStateMatcher = new FormErrorStateMatcher();

  public formControls = {
    emailFormControl: undefined,
    nameFormControl: undefined,
    descriptionFormControl: undefined,
    phoneFormControl: undefined,
    cityFormControl: undefined,
    addressFormControl: undefined
  };

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private providerService: ProviderService) { }

  public async ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser.id) {
      this.provider = await this.providerService.getProviderById(currentUser.id);
    }
    this.galleryOptions = [
      { image: false, height: '300px', width: '100%', thumbnailsPercent: 50,
        actions: [{icon: 'fa fa-trash', onClick: this.removeImage.bind(this)}]
      },
      { breakpoint: 768, image: false, height: '160px', width: '100%', thumbnailsColumns: 3,
        actions: [{icon: 'fa fa-trash', onClick: this.removeImage.bind(this)}]
      }
    ];
    if (!this.provider.address) {
      this.switchState('edit');
    }
    this.initGalleryImages();

    console.log(this.translate.getLangs());
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
      this.formControls.cityFormControl = new FormControl(this.provider.city || '',
        [Validators.required]);
      this.formControls.addressFormControl = new FormControl(this.provider.address || '',
        [Validators.required]);
      this.formControls.descriptionFormControl = new FormControl(this.provider.description || '');
    }
    this.state = state;
  }

  public async updateProvider() {
    const editingProvider = {...this.provider};
    editingProvider.city = this.formControls.cityFormControl.value;
    editingProvider.address = this.formControls.addressFormControl.value;
    editingProvider.name = this.formControls.nameFormControl.value;
    editingProvider.phone = this.formControls.phoneFormControl.value;
    editingProvider.description = this.formControls.descriptionFormControl.value;
    editingProvider.email = this.formControls.emailFormControl.value;
    if (editingProvider.city && editingProvider.address) {
      const coord = await this.providerService.getCoordinates(editingProvider);
      if (coord) Object.assign(editingProvider, coord);
    }

    this.state = 'loading';
    try {
      this.provider = await this.providerService.saveProvider(this.provider.id, editingProvider);
      this.state = 'show';
    } catch (e) {
      this.state = 'edit';
      console.error(e);
    }
  }

  public imageAdded(res) {
    if (!this.provider.images) this.provider.images = [];
    this.provider.images.push(res.imageUrl);
    this.initGalleryImages();
  }

  public removeImage(e, index) {
    this.provider.images.splice(index, 1);
    const closeIcon: any = document.querySelector('.ngx-gallery-close');
    if (closeIcon) closeIcon.click();
    this.initGalleryImages();
  }

  public logoAdded(res) {
    this.provider.logo = res.imageUrl;
  }

  public removeLogo() {
    this.provider.logo = undefined;
  }

  // ----- private functions ------

  private initGalleryImages() {
    this.galleryImages = undefined;
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
}
