Tinytest.add('Core - Transform', function(test) {
  reset();

  let Transforms = new Mongo.Collection(null);

  // Insert a document.
  Transforms.insert({
    name: 'name'
  });

  // Default transform function.
  let DefaultTransform = Astro.Class.create({
    name: 'DefaultTransform',
    collection: Transforms,
    fields: {
      name: 'string'
    }
  });

  // Custom transform function.
  let CustomClass = class {
    constructor(values) {
      _.extend(this, values);
    }
  };
  let CustomTransform = Astro.Class.create({
    name: 'CustomTransform',
    collection: Transforms,
    transform: function(values) {
      return new CustomClass(values);
    },
    fields: {
      name: 'string'
    }
  });

  // No transform function.
  let NoTransform = Astro.Class.create({
    name: 'NoTransform',
    collection: Transforms,
    transform: null,
    fields: {
      name: 'string'
    }
  });

  test.instanceOf(DefaultTransform.findOne(), DefaultTransform,
    'Default transform function should be applied to the fetched documents'
  );

  test.instanceOf(CustomTransform.findOne(), CustomClass,
    'Custom transform function should be applied to the fetched documents'
  );

  test.equal(NoTransform.findOne().constructor, Object,
    'No transform function should be applied to the fetched documents'
  );
});
