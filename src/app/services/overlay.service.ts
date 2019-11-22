import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { ComponentRef, Injectable, Injector } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OVERLAY_DATA } from "../config/overlay.config";

@Injectable({
  providedIn: "root"
})
export class OverlayService {
  decisionSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private overlay: Overlay, private injector: Injector) {}

  createInjector(overlayProps): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OVERLAY_DATA, overlayProps);
    return new PortalInjector(this.injector, injectorTokens);
  }

  open(overlayType, connectedElement?, overlayProps?, disableBackdrop?) {
    console.log(connectedElement);
    console.log(overlayProps);
    const overlayRef = this.overlay.create({
      positionStrategy: connectedElement
        ? this.overlay
            .position()
            .flexibleConnectedTo(connectedElement)
            .withPositions([
              {
                originX: "start",
                originY: "bottom",
                overlayX: "start",
                overlayY: "top"
              },
              {
                originX: "start",
                originY: "top",
                overlayX: "start",
                overlayY: "bottom"
              }
            ])
        : this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
      hasBackdrop: true,
      backdropClass: disableBackdrop ? null : "dark-backdrop",
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    const injectionData = overlayProps
      ? this.createInjector(overlayProps)
      : null;
    const queryHandlerPortal = new ComponentPortal(
      overlayType,
      null,
      injectionData
    );
    overlayRef.backdropClick().subscribe(() => {
      this.decisionSub.next(false);
      overlayRef.detach();
    });
    const componentRef: ComponentRef<any> = overlayRef.attach(
      queryHandlerPortal
    );
    if (componentRef.instance.submitEmitter) {
      componentRef.instance.submitEmitter.subscribe(decision => {
        this.decisionSub.next(decision);
        overlayRef.detach();
      });
    }
  }
}
