import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    auth: any;
    num1 = 10;
    num2 = 20;
    items: any = [];
    constructor(
        private session: SessionService
    ) {
        this.auth = this.session.auth;
        this.Init();

    }
    ionViewWillEnter() {
        this.RefreashItem();
    }
    async RefreashItem() {
        this.items = [];
        let items: any = await this.session.GetStorage("items");
        for (const [key, item] of Object.entries(items)) {
            this.items.push(item);
        }
    }
    async Init() {

    }
    async Logout() {

        let st = await this.session.ShowConfirm("คุณต้องการออกจากระบบใช่หรือไม่ ?")
        if (st == true) {
            this.session.RemoveStorage("auth");
            this.session.LinkTo("login");
        }
    }
    GoToMenu() {
        this.session.LinkTo("menu");
    }
    GoToHistory() {
        this.session.LinkTo("history");
    }
    GoToCart() {
        this.session.LinkTo("cart");
    }
}
