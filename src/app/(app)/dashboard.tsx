import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
    const { user, signOut } = useAuth();

    const pokemons = [
        {
            id: '001',
            name: 'Bulbasaur',
            type: 'Planta / Veneno',
            status: 'HP 45',
            attack: 'Chicote de Vinha',
            background: '#6CC56C',
            image: require('../../../assets/images/pokemons/001.png'),
        },
        {
            id: '002',
            name: 'Ivysaur',
            type: 'Planta / Veneno',
            status: 'HP 60',
            attack: 'Folha Navalha',
            background: '#4F9D69',
            image: require('../../../assets/images/pokemons/002.png'),
        },
        {
            id: '003',
            name: 'Venusaur',
            type: 'Planta / Veneno',
            status: 'HP 80',
            attack: 'Raio Solar',
            background: '#2E8B57',
            image: require('../../../assets/images/pokemons/003.png'),
        },
        {
            id: '004',
            name: 'Charmander',
            type: 'Fogo',
            status: 'HP 39',
            attack: 'Brasa',
            background: '#FF914D',
            image: require('../../../assets/images/pokemons/004.png'),
        },
        {
            id: '005',
            name: 'Charmeleon',
            type: 'Fogo',
            status: 'HP 58',
            attack: 'Lança-chamas',
            background: '#FF6B35',
            image: require('../../../assets/images/pokemons/005.png'),
        },
        {
            id: '006',
            name: 'Charizard',
            type: 'Fogo / Voador',
            status: 'HP 78',
            attack: 'Explosão de Fogo',
            background: '#E85D04',
            image: require('../../../assets/images/pokemons/006.png'),
        },
        {
            id: '007',
            name: 'Squirtle',
            type: 'Água',
            status: 'HP 44',
            attack: 'Jato de Água',
            background: '#4D96FF',
            image: require('../../../assets/images/pokemons/007.png'),
        },
        {
            id: '008',
            name: 'Wartortle',
            type: 'Água',
            status: 'HP 59',
            attack: 'Hidro Bomba',
            background: '#3A86FF',
            image: require('../../../assets/images/pokemons/008.png'),
        },
        {
            id: '009',
            name: 'Blastoise',
            type: 'Água',
            status: 'HP 79',
            attack: 'Canhão de Água',
            background: '#1D4ED8',
            image: require('../../../assets/images/pokemons/009.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.subtitle}>Pokédex</Text>
                    <Text style={styles.title}>Olá, {user}</Text>
                </View>

                <Pressable style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>Sair</Text>
                </Pressable>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {pokemons.map((pokemon) => (
                    <View
                        key={pokemon.id}
                        style={[
                            styles.card,
                            { backgroundColor: pokemon.background },
                        ]}
                    >
                        <View style={styles.circle} />

                        <View style={styles.topArea}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.number}>
                                    #{pokemon.id}
                                </Text>

                                <Text style={styles.name}>
                                    {pokemon.name}
                                </Text>

                                <View style={styles.typeBadge}>
                                    <Text style={styles.typeText}>
                                        {pokemon.type}
                                    </Text>
                                </View>

                                <Text style={styles.info}>
                                    ❤️ {pokemon.status}
                                </Text>

                                <Text style={styles.attack}>
                                    ⚡ {pokemon.attack}
                                </Text>
                            </View>

                            <Image
                                source={pokemon.image}
                                style={styles.image}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },

    subtitle: {
        color: '#94A3B8',
        fontSize: 16,
    },

    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },

    logoutButton: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#334155',
    },

    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },

    scrollContent: {
        paddingBottom: 40,
        gap: 20,
    },

    card: {
        borderRadius: 30,
        padding: 22,
        overflow: 'hidden',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 8,
    },

    circle: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.12)',
        top: -70,
        right: -60,
    },

    topArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    infoContainer: {
        flex: 1,
    },

    number: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },

    name: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    typeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        marginBottom: 14,
    },

    typeText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 12,
    },

    info: {
        color: '#FFF',
        fontSize: 15,
        marginBottom: 6,
        fontWeight: '500',
    },

    attack: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    image: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        transform: [{ scale: 1.15 }],
    },
});