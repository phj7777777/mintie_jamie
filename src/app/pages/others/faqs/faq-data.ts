import { Card, Accordion, AccordionGroup } from '../../elements/accordions/accordion-data';

const card1: Card = {
    title: 'How will my parcel be delivered?',
    body: 'We support purchase on Amazon and orders shipping to an eligible destination with at least the stated minimum threshold of eligible items, qualify for Free Shipping by Amazon.'
}

const card2: Card = {
    title: 'Do I pay for delivery?',
    body: 'Shipping is free if your order includes at least the stated minimum threshold of eligible items. Any item with "FREE Shipping" on the product detail page that is fulfilled and shipped by Amazon is eligible and contributes to your free shipping order minimum.'
}

// const card3: Card = {
//     title: 'Will I be charged customs fees?',
//     body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
// }

// const card4: Card = {
//     title: 'My item has become faulty',
//     body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
// }

const card5: Card = {
    title: 'What can I return?',
    body: 'You may return most new, unopened items sold and fulfilled by Amazon within 30 days of delivery. Learn more about '
}

const card6: Card = {
    title: 'What items are eligible for a FREE returns option?',
    body: 'Amazon.com offers free returns on most items delivered to an address in the 50 United States. Look for “Free returns” next to the price to confirm that the item qualifies for free returns.'
}

const card7: Card = {
    title: 'How does FREE Returns work?',
    body: 'All return-eligible items, weighing under 50 lbs and sold by Amazon, have at least one free return option. You can return the item for any reason in new and unused condition for up to 30 days after purchase.'
}

const card8: Card = {
    title: 'When will I get my refund?',
    body: 'Most refunds are fully refunded in 3-5 days after we receive and process your return. Learn more about Refunds'
}

const card9: Card = {
    title: 'Does Amazon offer replacements and exchanges?',
    body: 'Yes, you can create replacement and exchange orders from this page by clicking Return Items and following the instructions. If you received a damaged or defective item, we’ll ship you a replacement of the exact item. If you would like to exchange an item for another, you can exchange for a different size or color or for an item in your Cart.'
}

const card10: Card = {
    title: "I can't make a payment",
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card11: Card = {
    title: "Has my payment gone through?",
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const faq1: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card1, card2
    ]
}

const faq2: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card5, card6, card7, card8, card9
    ]
}

const faq3: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card10, card11
    ]
}

export const faqGroups: AccordionGroup[] = [
    {
        title: 'Shipping Information',
        items: [
            faq1
        ]
    },
    {
        title: 'Orders and Returns',
        items: [
            faq2
        ]
    },
    // {
    //     title: 'Payments',
    //     items: [
    //         faq3
    //     ]
    // }
]