export const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American, Fast Food',
    rating: 4.8,
    reviews: 324,
    deliveryTime: 25,
    deliveryFee: 2.99,
    image: '/burger-restaurant.jpg',
    category: 'fast-food',
    menu: [
      { id: '1-1', name: 'Classic Burger', price: 8.99, description: 'Juicy beef patty with fresh toppings', image: '/classic-beef-burger.png' },
      { id: '1-2', name: 'Cheese Burger', price: 9.99, description: 'Double cheese with crispy bacon', image: '/classic-cheeseburger.png' },
      { id: '1-3', name: 'French Fries', price: 3.99, description: 'Golden and crispy', image: '/golden-crispy-fries.png' },
      { id: '1-4', name: 'Milkshake', price: 4.99, description: 'Vanilla, Chocolate, or Strawberry', image: '/classic-milkshake.png' },
    ]
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    cuisine: 'Italian, Pizza',
    rating: 4.9,
    reviews: 512,
    deliveryTime: 30,
    deliveryFee: 3.99,
    image: '/pizza-restaurant.jpg',
    category: 'pizza',
    menu: [
      { id: '2-1', name: 'Margherita Pizza', price: 12.99, description: 'Fresh mozzarella and basil', image: '/margherita-pizza.png' },
      { id: '2-2', name: 'Pepperoni Pizza', price: 13.99, description: 'Classic pepperoni favorite', image: '/pepperoni-pizza.jpg' },
      { id: '2-3', name: 'Garlic Bread', price: 5.99, description: 'Soft and buttery', image: '/garlic-bread.png' },
      { id: '2-4', name: 'Caesar Salad', price: 7.99, description: 'Crisp romaine lettuce', image: '/caesar-salad.png' },
    ]
  },
  {
    id: '3',
    name: 'Dragon Wok',
    cuisine: 'Chinese, Asian',
    rating: 4.7,
    reviews: 288,
    deliveryTime: 35,
    deliveryFee: 2.49,
    image: '/asian-restaurant.jpg',
    category: 'asian',
    menu: [
      { id: '3-1', name: 'Chicken Fried Rice', price: 10.99, description: 'Fluffy rice with tender chicken', image: '/fried-rice.jpg' },
      { id: '3-2', name: 'Pad Thai', price: 11.99, description: 'Authentic Thai noodles', image: '/pad-thai.jpg' },
      { id: '3-3', name: 'Spring Rolls', price: 6.99, description: 'Crispy and golden', image: '/spring-rolls.jpg' },
      { id: '3-4', name: 'Mango Sticky Rice', price: 5.99, description: 'Sweet and creamy dessert', image: '/mango-sticky-rice.jpg' },
    ]
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.6,
    reviews: 195,
    deliveryTime: 20,
    deliveryFee: 2.99,
    image: '/mexican-restaurant.jpg',
    category: 'mexican',
    menu: [
      { id: '4-1', name: 'Beef Tacos', price: 9.99, description: 'Seasoned beef with fresh salsa', image: '/delicious-tacos.png' },
      { id: '4-2', name: 'Chicken Burrito', price: 11.99, description: 'Filled with rice and beans', image: '/delicious-burrito.png' },
      { id: '4-3', name: 'Guacamole & Chips', price: 5.99, description: 'Fresh avocado dip', image: '/fresh-guacamole.png' },
      { id: '4-4', name: 'Churros', price: 4.99, description: 'Crispy and sweet', image: '/churros.jpg' },
    ]
  },
  {
    id: '5',
    name: 'Sweet Tooth Bakery',
    cuisine: 'Desserts, Bakery',
    rating: 4.9,
    reviews: 421,
    deliveryTime: 15,
    deliveryFee: 1.99,
    image: '/bustling-bakery.png',
    category: 'dessert',
    menu: [
      { id: '5-1', name: 'Chocolate Cake', price: 6.99, description: 'Rich and decadent', image: '/decadent-chocolate-cake.png' },
      { id: '5-2', name: 'Cheesecake', price: 7.99, description: 'Creamy and delicious', image: '/classic-cheesecake.png' },
      { id: '5-3', name: 'Croissant', price: 3.99, description: 'Buttery and flaky', image: '/golden-croissant.png' },
      { id: '5-4', name: 'Macarons', price: 8.99, description: 'Assorted flavors', image: '/colorful-macarons.png' },
    ]
  },
  {
    id: '6',
    name: 'Sushi Master',
    cuisine: 'Japanese, Asian',
    rating: 4.8,
    reviews: 356,
    deliveryTime: 40,
    deliveryFee: 4.99,
    image: '/sushi-restaurant.jpg',
    category: 'asian',
    menu: [
      { id: '6-1', name: 'California Roll', price: 12.99, description: 'Crab and avocado', image: '/california-roll.jpg' },
      { id: '6-2', name: 'Spicy Tuna Roll', price: 13.99, description: 'For spice lovers', image: '/spicy-tuna.jpg' },
      { id: '6-3', name: 'Edamame', price: 4.99, description: 'Steamed and salted', image: '/edamame-bowl.png' },
      { id: '6-4', name: 'Miso Soup', price: 3.99, description: 'Traditional soy-based soup', image: '/miso-soup.jpg' },
    ]
  }
];

export const users = [
  {
    id: '1',
    name: 'Nick Fury',
    email: 'nick@slooze.com',
    password: 'admin123', // Mock password
    role: 'ADMIN',
    country: 'India',
  },
  {
    id: '2',
    name: 'Captain Marvel',
    email: 'marvel@slooze.com',
    password: 'manager123',
    role: 'MANAGER',
    country: 'India',
  },
  {
    id: '3',
    name: 'Captain America',
    email: 'america@slooze.com',
    password: 'manager123',
    role: 'MANAGER',
    country: 'America',
  },
  {
    id: '4',
    name: 'Thanos',
    email: 'thanos@slooze.com',
    password: 'member123',
    role: 'MEMBER',
    country: 'India',
  },
  {
    id: '5',
    name: 'Travis',
    email: 'travis@slooze.com',
    password: 'member123',
    role: 'MEMBER',
    country: 'America',
  },
];
