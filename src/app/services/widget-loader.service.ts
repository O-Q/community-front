import {
  Injectable,
  Injector,
  Compiler,
  NgModuleFactory,
  Type,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { LAZY_WIDGETS } from '../components/widgets/tokens';

@Injectable({
  providedIn: 'root'
})
export class WidgetLoaderService {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    @Inject(LAZY_WIDGETS)
    private lazyWidgets: {
      [key: string]: () => Promise<NgModuleFactory<any> | Type<any>>;
    }
  ) {}
  async load(name: string, container: ViewContainerRef) {
    const tempModule = await this.lazyWidgets[name]();

    let moduleFactory: NgModuleFactory<any>;

    if (tempModule instanceof NgModuleFactory) {
      // For AOT
      moduleFactory = tempModule;
    } else {
      // For JIT
      moduleFactory = await this.compiler.compileModuleAsync(tempModule);
    }

    const entryComponent = (moduleFactory.moduleType as any).entry;
    const moduleRef = moduleFactory.create(this.injector);

    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
      entryComponent
    );

    container.createComponent(compFactory);
  }
}
