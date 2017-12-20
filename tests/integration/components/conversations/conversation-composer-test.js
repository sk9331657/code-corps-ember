import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-composer';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-composer body=body send=onSend}}
  `);
}

moduleForComponent('conversations/conversation-composer', 'Integration | Component | conversations/conversation composer', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onSend', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('disables submit when body is blank', function(assert) {
  assert.expect(3);
  set(this, 'body', null);

  renderPage();

  assert.ok(page.submitButton.isDisabled, 'Submit is disabled if null');
  run(() => set(this, 'body', 'foo'));
  assert.notOk(page.submitButton.isDisabled, 'Submit is enabled if non-empty string');
  run(() => set(this, 'body', ''));
  assert.ok(page.submitButton.isDisabled, 'Submit is disabled if blank string');
});

test('sends out action and blanks out body when clicking submit', function(assert) {
  assert.expect(3);

  set(this, 'body', 'foo');
  set(this, 'onSend', (body) => {
    assert.equal(body, 'foo', 'Correct value was sent with action.');
  });

  renderPage();
  assert.equal(page.submittableTextarea.value, 'foo', 'Body is rendered correctly.');
  page.submitButton.click();
  assert.equal(page.submittableTextarea.value, '', 'Body was blanked out.');
});

test('sends out action and blanks out body when hitting enter key', function(assert) {
  assert.expect(3);

  set(this, 'body', 'foo');
  set(this, 'onSend', (body) => {
    assert.equal(body, 'foo', 'Correct value was sent with action.');
  });

  renderPage();
  assert.equal(page.submittableTextarea.value, 'foo', 'Body is rendered correctly.');
  page.submittableTextarea.keySubmit();
  assert.equal(page.submittableTextarea.value, '', 'Body was blanked out.');
});