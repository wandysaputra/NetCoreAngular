import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services";


@Component({  
    selector: '[footer]',
    templateUrl: "footer.component.html",
    styleUrls: []
})
export class Footer implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        var offset = 300;
        var duration = 500;

        //if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        //    $(window).bind("touchend touchcancel touchleave", function (e) {
        //        if ($(this).scrollTop() > offset) {
        //            $('.scroll-to-top').fadeIn(duration);
        //        } else {
        //            $('.scroll-to-top').fadeOut(duration);
        //        }
        //    });
        //} else {  // general 
        //    $(window).scroll(function () {
        //        if ($(this).scrollTop() > offset) {
        //            $('.scroll-to-top').fadeIn(duration);
        //        } else {
        //            $('.scroll-to-top').fadeOut(duration);
        //        }
        //    });
        //}

        //$('.scroll-to-top').click(function (e) {
        //    e.preventDefault();
        //    $('html, body').animate({ scrollTop: 0 }, duration);
        //    return false;
        //});
    };
}