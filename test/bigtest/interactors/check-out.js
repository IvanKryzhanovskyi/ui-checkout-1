import {
  clickable,
  fillable,
  interactor,
  isPresent,
  text,
  Interactor,
  collection,
  count,
  value,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';
import ConfirmModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';
import SelectItemModalInteractor from './select-item-modal';

import ScanItemsInteractor from './scan-items';
import ItemMenuInteractor from './item-menu';
import BlockModalInteractor from './block-modal';
import MultipieceModalInteractor from './multipiece-modal';
import CheckoutNoteModalInteractor from './checkout-note-modal';
import ErrorModal from './error-modal';
import OverrideModal from './override-modal';
import Item from './item';
import ProxyModalInteractor from './proxy-modal';

export default interactor(class CheckOutInteractor {
  static defaultScope = '[data-test-check-out-scan]';

  scanItems = new ScanItemsInteractor('[data-test-scan-items]');
  itemMenu = new ItemMenuInteractor();
  blockModal = new BlockModalInteractor();
  proxyModal = new ProxyModalInteractor();

  suspendedAccount = new Interactor('[data-test-suspended-account]');
  openRequestsCount = new Interactor('[data-test-open-requests-count]');
  patronIdentifierPresent = isPresent('#input-patron-identifier');
  patronEnterBtnPresent = isPresent('#clickable-find-patron');
  createInventoryEnterBtnPresent = isPresent('#clickable-create-inventory-records');
  checkoutNotes = new Interactor('[data-test-checkout-notes]');
  fillPatronBarcode = fillable('#input-patron-identifier');
  clickPatronBtn = clickable('#clickable-find-patron');
  selectElipse = clickable('[data-test-elipse-select] button');
  itemBarcodePresent = isPresent('#input-item-barcode');
  fillItemBarcode = fillable('#input-item-barcode');
  clickItemBtn = clickable('#clickable-add-item');
  clickFindUserBtn = clickable('#clickable-find-user');
  clickEndSessionBtn = clickable('#clickable-done-footer');
  endSessionBtnPresent = isPresent('#clickable-done-footer');

  patronFullName = text('#patron-detail [data-test-check-out-patron-full-name]');
  proxyFullName = text('#proxy-detail [data-test-check-out-patron-full-name]');
  itemBarcode = value('#input-item-barcode');

  patronFullNameIsPresent = isPresent('#patron-detail [data-test-check-out-patron-full-name]');

  errorModal = new ErrorModal();
  overrideModal = new OverrideModal();
  checkoutNoteModal = new CheckoutNoteModalInteractor();
  confirmStatusModal = new ConfirmModalInteractor('#test-confirm-status-modal');
  selectItemModal = new SelectItemModalInteractor();
  items = collection('#list-items-checked-out [class*=mclRowContainer---] [class^="mclRow---"]', Item);
  itemsCount = count('#list-items-checked-out [class*=mclRowContainer---] [class^="mclRow---"]', Item);

  patronErrorPresent = isPresent('#section-patron [class*=error---]');
  confirmStatusModalPresent = isPresent('#test-confirm-status-modal');
  patronDetailIsPresent = isPresent('#patron-detail');
  proxyDetailIsPresent = isPresent('#proxy-detail');

  checkoutItem(barcode) {
    return this
      .fillItemBarcode(barcode)
      .clickItemBtn();
  }

  multipieceModal = new MultipieceModalInteractor('#multipiece-modal');
  itemList = new MultiColumnListInteractor('#list-items-checked-out');
  itemListEmptyMessage = text('[data-test-scan-items] [class*=mclEmptyMessage---]');

  whenUserIsLoaded() {
    return this.when(() => this.patronFullNameIsPresent, 5000);
  }

  whenItemListIsPresent() {
    return this.when(() => this.itemList.itemListPresent && this.itemList.rowCount > 0);
  }

  whenProxyModalIsPresent() {
    return this.when(() => this.proxyModal.isPresent);
  }

  whenConfirmStatusModalPresent() {
    return this.when(() => this.confirmStatusModal.isPresent);
  }
});
