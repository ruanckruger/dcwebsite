import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  gradient: string;
  width = 1920;
  height = 1080;
  inWidth = 1920;
  inHeight = 1080;
  radius = 0;
  spinAnim = "spin 7s linear infinite";
  blurAnim = "blur 2s linear infinite";
  waveAnim = "";
  pulseAnim = "";

  outerAnim = "";
  innerAnim = "";

  url: string = "http://daddycoolgaming.co.za/border?";
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.calculateSize();
  }

  PreviewGradient(gradient) {
    this.gradient = gradient;
    this.generateUrl();
    this.cdr.detectChanges();
  }

  PreviewAnim(anims: string[]) {
    this.innerAnim = "";
    this.outerAnim = "";
    anims.forEach(anim => {
      if (anim.indexOf("spin") >= 0) {
        if (this.innerAnim == "")
          this.innerAnim = anim;
        else
          this.innerAnim += ',' + anim;
      }
      if (anim.indexOf("pulse") >= 0) {
        if (this.outerAnim == "")
          this.outerAnim = anim;
        else
          this.outerAnim += ',' + anim;
      }
      if (anim.indexOf("blur") >= 0) {
        if (this.outerAnim == "")
          this.outerAnim = anim;
        else
          this.outerAnim += ',' + anim;
      }
    });
    this.generateUrl();
    this.cdr.detectChanges();
  }

  calculateSize() {
    this.inWidth = Math.ceil(Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))) + 100;
  }

  generateUrl() {
    this.url = "http://daddycoolgaming.co.za/border?";
    this.url += "gradient=" + encodeURIComponent(this.gradient);
    if (this.innerAnim != "")
      this.url += '&innerAnim=' + encodeURIComponent(this.innerAnim);
    if (this.outerAnim != "")
      this.url += '&outerAnim=' + encodeURIComponent(this.outerAnim);
    this.url += '&radius=' + this.radius;
  }
  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  copyToClipboard() {
    this.copyTextToClipboard(this.url);
    alert("Copied to clipboard");
  }

  fallbackCopyTextToClipboard(text) {
    var urlInput = document.getElementById("url") as HTMLInputElement;
    urlInput.value = text;
    urlInput.focus();
    urlInput.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  }

  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}
