import * as util from '../../util';

/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function range(rule, value, source, errors, options) {
  const len = typeof rule.len === 'number';
  const min = typeof rule.min === 'number';
  const max = typeof rule.max === 'number';
  let val = value;
  let key = null;
  const num = typeof value === 'number';
  const str = typeof value === 'string';
  const arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  }
  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return false;
  }
  if (str || arr) {
    val = value.length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(
        util.getErrorMessageFromRuleOrTemplate(rule, options.messages[key].len, rule.len)
      );
    }
  } else if (min && !max && val < rule.min) {
    errors.push(util.getErrorMessageFromRuleOrTemplate(rule, options.messages[key].min, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(util.getErrorMessageFromRuleOrTemplate(rule, options.messages[key].max, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(
      util.getErrorMessageFromRuleOrTemplate(rule, options.messages[key].range, rule.min, rule.max)
    );
  }
}

export default range;
