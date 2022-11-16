const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    const {Suppliers} = this.entities()
    const {Products} = this.entities()

    this.after('each',Products, row =>{
            console.log(`Event Read Product: ${row.ID}`)
        })
        
        this.after(['CREATE', 'UPDATE', 'DELETE'], [Products], async (Product, req) => {
            const header = req.data
            req.on('succeeded', () => {
                global.it || console.log(`< emitting: product_Changed ${Product.ID}`)
                this.emit('prod_Change', header)
            })
        })

    this.after('each',Suppliers, row =>{
        console.log(`Event Read Suppliers: ${row.ID}`)
    })
    
    this.after(['CREATE', 'UPDATE', 'DELETE'], [Suppliers], async (Supplier, req) => {
        const header = req.data
        req.on('succeeded', () => {
            global.it || console.log(`< emitting: supplier_Changed ${Supplier.ID}`)
            this.emit('supl_Change', header)
        })
    })
})