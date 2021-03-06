"use strict";

/**
 * Modal
 */
class Modal {

	/**
	 * Constructor
	 *
	 * @class
	 *
	 * @param      {string}  mId     Modal ID
	 */
	constructor(mId) {
		this.id = mId;
	}

	/**
	 * Show the modal
	 */
	open() {

		$('#id-modal-' + this.id).addClass('shown');

		return new Promise((resolve, reject) => {
			_.delay(resolve, 500);
		});

	}

	/**
	 * Bind modal actions
	 *
	 * @param      {string}              act     Action
	 * @param      {(Function|boolean)}  clb     Callback
	 */
	bind(act, clb = false) {

		$('#id-modal-' + this.id + ' .modal-actions > button.act-' + act).one('click', (e) => {
			if(clb) {
				clb();
			} else {
				this.close();
			}
		});

	}

	/**
	 * Close the modal
	 *
	 * @param      {boolean}  immediate  Close without animation
	 */
	close(immediate = false) {
		$('#id-modal-' + this.id + ' .modal-actions > button').off('click');
		$('#id-modal-' + this.id).addClass('exit');
		_.delay(() => {
			$(document.body).removeClass('dimmed');
			$('#id-modal-' + this.id).removeClass('shown exit');
		}, (immediate) ? 0 : 500);
	}

	/**
	 * Sets the content of inner element
	 *
	 * @param      {(string|Element)}  elm      Element to update
	 * @param      {string}            content  New content
	 */
	setContent(elm, content) {
		$(elm, '#id-modal-' + this.id).html(content);
	}

	/**
	 * Gets an inner element of the modal
	 *
	 * @param      {(string|Element)}  elm     Element to get
	 * @return     {Element}           The element
	 */
	getElement(elm) {
		return $(elm, '#id-modal-' + this.id);
	}

}