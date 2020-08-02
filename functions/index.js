const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

admin.initializeApp()
const db = admin.firestore()

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.adminkey
)
const collectionIndexName = 'articles'
const collectionIndex = algoliaClient.initIndex(collectionIndexName)

exports.articleToAlgolia = functions.https.onRequest(
  async (req, res) => {
    const algoliaRecords = []

    const querySnapshot = await db.collection('markdowns').get()

    querySnapshot.docs.forEach(doc => {
      const document = doc.data()
      if (document.draft === false) {
        const record = {
          objectID: doc.id,
          slug: document.slug,
          title: document.title,
          subtitle: document.subtitle
        }

        algoliaRecords.push(record)
      }
    })

    collectionIndex.saveObjects(algoliaRecords, (error, content) => {
      if (error) res.status(500).send('Error occurred while saving records')
      res.status(200).send('articles was indexed to Algolia successfully.')
    })
  }
)
