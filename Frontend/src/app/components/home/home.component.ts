import { Component, OnInit , AfterViewInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../../assets/css/main.css','../../../assets/vendor/aos/aos.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
this.loadJsFiles();
  }
  loadJsFiles(): void {
    // this.loadJsFile("../../../../assets/js/common.js");
    // this.loadJsFile("../../../../assets/js/global.js");
    this.loadExternalScript("../../../../assets/js/main/main.js");
  }
  loadExternalScript(url: string): void {
    this.loadScript(url)
      .then(() => {
        console.log('Script loaded successfully');
      })
      .catch((error) => {
        console.error('Script loading failed:', error);
      });
  }
  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;

      scriptElement.onload = () => {
        resolve();
      };

      scriptElement.onerror = (error) => {
        reject(error);
      };

      document.body.appendChild(scriptElement);
    });
  } 
}