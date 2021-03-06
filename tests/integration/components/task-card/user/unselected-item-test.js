import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible
} from 'code-corps-ember/tests/helpers/ember-tooltips';
import unselectedItem from 'code-corps-ember/tests/pages/components/task-card/user/unselected-item';

let page = PageObject.create(unselectedItem);

moduleForComponent('task-card/user/unselected-item', 'Integration | Component | task card/user/unselected item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('the tooltip is not rendered initially', function(assert) {
  let task = { userTask: { isLoading: true } };
  this.set('task', task);
  this.render(hbs`{{task-card/user/unselected-item task=task}}`);
  assert.notOk(page.isTooltipTarget, 'There is not a tooltip.');
  assert.ok(page.loadingIcon.isVisible, 'The loading icon renders.');
});

test('the default state when user task is loaded', function(assert) {
  let task = { userTask: { isLoading: false } };
  this.set('task', task);
  this.render(hbs`{{task-card/user/unselected-item task=task}}`);
  assert.notOk(page.loadingIcon.isVisible, 'The loading icon does not render.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip because it lazy renders.');
});

test('the tooltip renders lazily, triggered by mouseEnter', function(assert) {
  assert.expect(5);

  this.render(hbs`{{task-card/user/unselected-item}}`);

  assertTooltipNotRendered(assert);

  page.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  page.mouseleave();

  assertTooltipRendered(assert);
  assertTooltipNotVisible(assert);
});
