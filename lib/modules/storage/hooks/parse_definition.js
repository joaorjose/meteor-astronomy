Astro.Module.modules.storage.onParseDefinition = function(
  definition, className
) {
  let parsedDefinition = {};

  // Check existence and validity of the "collection" property.
  if (_.has(definition, 'collection') && definition.collection !== null) {
    // The "collection" property has to be an instance of the
    // "Mongo.Collection".
    if (!(definition.collection instanceof Mongo.Collection)) {
      Astro.utils.core.throwParseError([
        {class: className}, {property: 'collection'},
        'The property value has to be an instance of "Mongo.Collection"'
      ]);
    }

    parsedDefinition.collection = definition.collection;
  }

  // Check existence and validity of the "typeField" property.
  if (_.has(definition, 'typeField') && definition.typeField !== null) {
    // The "typeField" property has to be a string.
    if (!_.isString(definition.typeField)) {
      Astro.utils.core.throwParseError([
        {class: className}, {property: 'typeField'},
        'The property value has to be a string'
      ]);
    }

    parsedDefinition.typeField = definition.typeField;
  }

  // Check existence and validity of the "transform" property.
  if (definition.transform !== undefined) {
    // The "transform" property has to be a function.
    if (!Match.test(definition.transform, Match.OneOf(Function, null))) {
      Astro.utils.core.throwParseError([
        {class: className}, {property: 'transform'},
        'The property value has to be a function or null'
      ]);
    }

    parsedDefinition.transform = definition.transform;
  }

  return parsedDefinition;
};